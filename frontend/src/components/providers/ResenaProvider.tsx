'use client'
import { BasicCiudadanoData } from '@/types/cuidadanos';
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ResenaContextProps {
   cuidadano: BasicCiudadanoData | null;
   setCuidadano: (cuidadano: BasicCiudadanoData | null) => void;
}

export const ResenaContext = createContext<ResenaContextProps>({
    cuidadano: null,
    setCuidadano: () => {},
});
export const useResenaContext = () => useContext(ResenaContext);

interface ResenaProviderProps {
    children: ReactNode;
}

export const ResenaProvider: React.FC<ResenaProviderProps> = ({ children }) => {
    const [cuidadano, setCuidadano] = useState<BasicCiudadanoData | null>(null);

    return (
        <ResenaContext.Provider value={{ 
            cuidadano,
            setCuidadano,
        }}>
            {children}
        </ResenaContext.Provider>
    );
};