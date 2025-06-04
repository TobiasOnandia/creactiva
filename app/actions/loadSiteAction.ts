'use server'

import { createClient } from '@/utils/supabase/server';

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

    // 4. Formatear los datos para el canvas
    const formattedSections = sections?.map(section => ({
      id: section.id,
      name: section.name,
      slug: section.slug,
      isHome: section.is_home,
      elements: section.elements?.map((element: any) => ({
        id: element.id,
        type: element.type,
        config: element.config
      })) || [],
      layout: section.layouts?.[0]?.layout_data || []
    })) || [];

    return {
      success: true,
      site,
      sections: formattedSections
    };
  } catch (error) {
    console.error('Error al cargar el sitio:', error);
    return { success: false, error };
  }
}
