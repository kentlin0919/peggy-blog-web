import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type SystemModule = Database['public']['Tables']['system_modules']['Row'];

export function useSystemModules() {
  const [modules, setModules] = useState<SystemModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data, error } = await supabase
          .from('system_modules')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching system modules:', error);
          return;
        }

        if (data) {
          setModules(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();

    // Subscribe to changes
    const channel = supabase
      .channel('system_modules_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_modules',
        },
        (payload) => {
          fetchModules();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const isModuleEnabled = (key: string) => {
    const module = modules.find((m) => m.key === key);
    // If module not found, default to true or false? 
    // Secure by default: false if strictly managed, but true if likely forgotten.
    // Given we seeded everything, let's default to false if not found to be safe.
    return module ? module.is_active : false;
  };

  const getModulesByRole = (role: 'student' | 'teacher' | 'admin') => {
    return modules.filter((m) => m.role === role);
  };

  return {
    modules,
    loading,
    isModuleEnabled,
    getModulesByRole,
  };
}
