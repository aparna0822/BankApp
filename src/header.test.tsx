import {render, screen } from '@testing-library/react';
import { Header } from "./Header";

describe('Haeder Componet' , () =>{
    it('renders the title',() =>{
        render(<Header/>);
        expect(screen.getByText('Banking Application')).toBeInTheDocument();
    });
    it('renders the logo',() => {
        render(<Header/>);
        expect(screen.getByAltText('')).toBeInTheDocument();
    });
});