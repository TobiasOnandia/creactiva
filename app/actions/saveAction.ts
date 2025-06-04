'use server'

import { createClient } from '@/utils/supabase/server';


export async function saveSite(siteData: {
  sections: any[];
  name?: string;
  slug?: string;
}) {
  const supabase = await createClient();

  try {
    // 1. Obtener el usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No se encontró usuario');

    // 2. Crear o actualizar el sitio
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .upsert({
        user_id: user.id,
        name: siteData.name || 'Mi Sitio',
        slug: siteData.slug || 'mi-sitio',
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (siteError) throw siteError;

    // 3. Guardar cada sección
    for (const section of siteData.sections) {
      // Guardar la sección
      const { data: dbSection, error: sectionError } = await supabase
        .from('sections')
        .upsert({
          site_id: site.id,
          name: section.name,
          slug: section.slug,
          is_home: section.isHome,
          order_index: siteData.sections.indexOf(section),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (sectionError) throw sectionError;

      // Guardar los elementos de la sección
      if (section.elements?.length > 0) {
        const { error: elementsError } = await supabase
          .from('elements')
          .upsert(
            section.elements.map((element: any) => ({
              section_id: dbSection.id,
              type: element.type,
              config: element.config,
              updated_at: new Date().toISOString()
            }))
          );

        if (elementsError) throw elementsError;
      }

      // Guardar el layout de la sección
      if (section.layout) {
        const { error: layoutError } = await supabase
          .from('layouts')
          .upsert({
            section_id: dbSection.id,
            layout_data: section.layout,
            device: 'desktop', // Por defecto guardamos el layout de desktop
            updated_at: new Date().toISOString()
          });

        if (layoutError) throw layoutError;
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error al guardar:', error);
    return { success: false, error };
  }
}
