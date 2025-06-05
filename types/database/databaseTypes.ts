import { Database } from "./database.types";

export type SectionTypes = Database['public']['Tables']['sections']['Row']
export type ElementsTypes = Database['public']['Tables']['elements']['Row']
export type LayoutsTypes = Database['public']['Tables']['layouts']['Row']
export type SitesTypes = Database['public']['Tables']['sites']['Row']
export type TemplatesTypes = Database['public']['Tables']['templates']['Row']


export type SectionTypesWithElementsAndLayouts = SectionTypes & {
  is_home: boolean;
  name: string;
  slug: string;
  id: string;
  elements: ElementsTypes[] | [];
  layout: LayoutsTypes[] | [];
}