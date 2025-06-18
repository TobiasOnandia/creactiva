import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SignInWithGoogle } from "@/components/actions/SignInWithGoogle";

// Mock del módulo sin variables externas
vi.mock("@/utils/supabase/client", () => ({
  supabaseClient: {
    auth: {
      signInWithOAuth: vi.fn(),
    },
  },
  __esModule: true,
}));

// Importar el mock después de la declaración del mock
import { supabaseClient } from "@/utils/supabase/client";
const mockSignInWithOAuth = supabaseClient.auth.signInWithOAuth as ReturnType<
  typeof vi.fn
>;

const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

describe("SignInWithGoogle Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar el botón de inicio de sesión con Google", () => {
    render(<SignInWithGoogle />);
    expect(screen.getByRole("button", { name: /google/i }));
    expect(screen.getByText("Google"));
  });

  it("debería llamar a signInWithOAuth con los parámetros correctos al hacer clic", async () => {
    const user = userEvent.setup();
    mockSignInWithOAuth.mockResolvedValue({ data: {}, error: null });

    render(<SignInWithGoogle />);
    const button = screen.getByRole("button", { name: /google/i });
    await user.click(button);

    expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  });

  it("debería registrar un mensaje de éxito si el inicio de sesión es exitoso", async () => {
    const user = userEvent.setup();
    const mockData = { user: { id: "123" }, session: {} };
    mockSignInWithOAuth.mockResolvedValue({ data: mockData, error: null });

    render(<SignInWithGoogle />);
    const button = screen.getByRole("button", { name: /google/i });
    await user.click(button);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Inicio de sesión exitoso con Google:",
      mockData
    );
  });

  it("debería registrar un error si el inicio de sesión falla", async () => {
    const user = userEvent.setup();
    const mockError = new Error("Fallo en el inicio de sesión");
    mockSignInWithOAuth.mockResolvedValue({ data: null, error: mockError });

    render(<SignInWithGoogle />);
    const button = screen.getByRole("button", { name: /google/i });
    await user.click(button);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error al iniciar sesión con Google:",
      mockError
    );
  });
});
