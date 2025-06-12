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
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error(`Error de autenticación: ${userError.message}`);
    if (!user) throw new Error('No se encontró usuario autenticado');

    // 2. Obtener el sitio del usuario
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (siteError) {
      if (siteError.code === 'PGRST116') {
        // Generar un slug único basado en el ID del usuario
        const uniqueSlug = `mi-sitio-${user.id.slice(0, 8)}`;

        // Crear un sitio por defecto si no existe
        const { data: newSite, error: createError } = await supabase
          .from('sites')
          .insert({
            user_id: user.id,
            name: 'Mi Sitio',
            slug: uniqueSlug,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (createError) throw new Error(`Error al crear el sitio: ${createError.message}`);
        
        // Crear una sección por defecto
        const { data: newSection, error: sectionCreateError } = await supabase
          .from('sections')
          .insert({
            site_id: newSite.id,
            name: 'Inicio',
            slug: 'inicio',
            is_home: true,
            order_index: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (sectionCreateError) throw new Error(`Error al crear la sección inicial: ${sectionCreateError.message}`);

        // Crear un layout por defecto para la sección
        const { error: layoutCreateError } = await supabase
          .from('layouts')
          .insert({
            section_id: newSection.id,
            layout_data: [],
            device: 'desktop',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (layoutCreateError) throw new Error(`Error al crear el layout inicial: ${layoutCreateError.message}`);

        // Obtener el sitio recién creado con sus secciones
        const { data: sections, error: sectionsError } = await supabase
          .from('sections')
          .select(`
            *,
            elements (*),
            layouts (*)
          `)
          .eq('site_id', newSite.id)
          .order('order_index');

        if (sectionsError) throw new Error(`Error al obtener las secciones: ${sectionsError.message}`);

        const formattedSections = sections?.map((section: Section) => {
          try {
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
          } catch (error) {
            console.error(`Error al formatear la sección ${section.id}:`, error);
            throw new Error(`Error al formatear la sección ${section.name}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
        }) || [];

        return {
          success: true,
          site: newSite,
          sections: formattedSections
        };
      }
      throw new Error(`Error al obtener el sitio: ${siteError.message}`);
    }

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

    if (sectionsError) throw new Error(`Error al obtener las secciones: ${sectionsError.message}`);

    // 4. Formatear y validar los datos para el canvas
    const formattedSections = sections?.map((section: Section) => {
      try {
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
      } catch (error) {
        console.error(`Error al formatear la sección ${section.id}:`, error);
        throw new Error(`Error al formatear la sección ${section.name}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
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
      error: error instanceof Error ? error.message : 'Error al cargar el sitio'
    };
  }
}
