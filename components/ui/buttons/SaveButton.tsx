'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';
import { saveSite } from '@/app/actions/saveAction';
import { toast } from 'sonner';

export const SaveButton = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { sections } = useCanvasStore();

  const handleSave = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        setIsSaving(true);
        
        const result = await saveSite({
          sections: sections.map(section => ({
            ...section,
            // Aseguramos que los datos son serializables
            elements: section.elements.map(element => ({
              type: element.type,
              config: element.config
            }))
          }))
        });

      if (result.success) {
          resolve('Cambios guardados correctamente');
        } else {
          reject(result.error);
        }
      } catch (error) {
        reject(new Error('Error al guardar los cambios'));
      } finally {
        setIsSaving(false);
      }
    });

    toast.promise(promise, {
      loading: 'Guardando cambios...',
      success: (message) => message as string,
      error: (error) => error.message
    });
  };

  return (
    <button
      className={`flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg transition-all duration-300
        ${isSaving 
          ? 'bg-emerald-500/20 text-emerald-400 cursor-wait'
          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300'
        } border border-emerald-500/30 hover:border-emerald-500/50`}
      onClick={handleSave}
      disabled={isSaving}
    >
      <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">
        {isSaving ? 'Guardando...' : 'Guardar'}
      </span>
    </button>
  );
};
