'use server'

import { createClient } from '@/utils/supabase/server';
import { GridLayout } from '@/types/canvas/LayoutTypes';
import { ElementConfig, ElementType  } from '@/types/canvas/CanvasTypes';

interface LayoutData {
  layout_data: GridLayout[];
}

interface Element {
  id: string;
  type: ElementType;
  config: Partial<ElementConfig>;
}

interface Section {
  id: string;
  name: string;
  slug: string;
  is_home: boolean;
  elements: Element[];
  layouts: LayoutData[];
}

export async function loadSite() {
  const supabase = await createClient();

  try {
    // 1. Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No se encontró usuario');

    // 2. Obtener el sitio del usuario
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (siteError) throw siteError;

    // 3. Obtener todas las secciones del sitio
    const { data: sections, error: sectionsError } = await supabase
      .from('sections')
      .select(`
        *,
        elements (*),
        layouts (*)
      `)
      .eq('site_id', site.id)
      .order('order_index');

    if (sectionsError) throw sectionsError;

    // 4. Formatear y validar los datos para el canvas
    const formattedSections = sections?.map((section: Section) => {
      // Validate and transform layout data
      const layoutData = section.layouts?.[0]?.layout_data || [];
      const validatedLayout = layoutData.map((item: GridLayout) => ({
        i: item.i,
        x: Number(item.x) || 0,
        y: Number(item.y) || 0,
        w: Number(item.w) || 1,
        h: Number(item.h) || 1,
        minH: item.minH,
        minW: item.minW,
        static: item.static,
        isDraggable: item.isDraggable
      }));

      return {
        id: section.id,
        name: section.name,
        slug: section.slug,
        isHome: section.is_home,
        elements: section.elements?.map((element: Element) => ({
          id: element.id,
          type: element.type,
          config: { ...element.config, type: element.type }
        })) || [],
        layout: validatedLayout
      };
    }) || [];

    return {
      success: true,
      site,
      sections: formattedSections
    };
  } catch (error) {
    console.error('Error loading site:', error);
    return {
      success: false,
      error: 'Error al cargar el sitio'
    };
  }
}
