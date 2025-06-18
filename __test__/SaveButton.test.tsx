import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SaveButton } from "@/components/ui/buttons/SaveButton";
import { saveSite } from "@/app/actions/saveAction";
import { loadSite } from "@/app/actions/loadSiteAction";
import { useCanvasStore } from "@/store/canvasStore";
import { toast } from "sonner";

vi.mock("@/app/actions/saveAction");
vi.mock("@/app/actions/loadSiteAction");
vi.mock("@/store/canvasStore");
vi.mock("sonner");

describe("SaveButton component", () => {
  const mockSetSections = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(useCanvasStore).mockImplementation((selector: any) => {
      const state = {
        sections: [
          {
            id: "section1",
            name: "Section 1",
            slug: "section-1",
            elements: [{ id: "temp_id_1", config: {} }],
            layout: [],
          },
        ],
        setSections: mockSetSections,
      };
      return selector(state);
    });

    vi.mocked(toast).promise = vi.fn((promise, toasts) => {
      promise.then(toasts.success).catch(toasts.error);
      return {
        unwrap: () => promise,
      };
    });
  });

  it("debería renderizar el botón con el texto 'Guardar'", () => {
    render(<SaveButton />);
    expect(
      screen.getByRole("button", { name: /guardar/i })
    ).toBeInTheDocument();
  });

  it("debería llamar a saveSite y mostrar estado de carga al hacer clic", async () => {
    const user = userEvent.setup();

    vi.mocked(saveSite).mockReturnValue(new Promise(() => {}));
    vi.mocked(loadSite).mockResolvedValue({
      success: true,
      sections: [],
      site: {},
    });

    render(<SaveButton />);
    const button = screen.getByRole("button", { name: /guardar/i });
    user.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    expect(screen.getByText(/guardando.../i)).toBeInTheDocument();
    expect(saveSite).toHaveBeenCalledTimes(1);
    expect(toast.promise).toHaveBeenCalledTimes(1);
  });

  it("debería actualizar las secciones después de un guardado y carga exitosos", async () => {
    const user = userEvent.setup();

    vi.mocked(saveSite).mockResolvedValue({ success: true });
    const newSections = [
      {
        id: "section2",
        elements: [],
        layout: [],
        name: "Section 2",
        slug: "section-2",
        isHome: false,
      },
    ];
    vi.mocked(loadSite).mockResolvedValue({
      success: true,
      sections: newSections,
      site: {},
    });

    render(<SaveButton />);
    const button = screen.getByRole("button", { name: /guardar/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockSetSections).toHaveBeenCalledWith(newSections);
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it("debería mostrar toast de error cuando el guardado falla", async () => {
    const user = userEvent.setup();
    const error = new Error("Fail");
    vi.mocked(saveSite).mockResolvedValue({
      success: false,
      error: error,
    });

    render(<SaveButton />);
    await user.click(screen.getByRole("button", { name: /guardar/i }));

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledTimes(1);
      const [promise, config] = vi.mocked(toast.promise).mock.calls[0];
      expect(
        typeof config?.error === "function" ? config.error(error) : undefined
      ).toBe(error.message);
    });
  });
});
