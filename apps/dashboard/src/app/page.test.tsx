import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Dashboard Page', () => {
  it('should render the dashboard heading', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { 
      name: /^Dashboard$/,
      level: 1 
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('should render back navigation link', () => {
    render(<Home />);
    
    const backLink = screen.getByRole('link', { 
      name: /Voltar ao Menu Principal/i 
    });
    
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('should render microfrontend indicator', () => {
    render(<Home />);
    
    const microfrontendHeading = screen.getByRole('heading', { 
      name: /Dashboard - Microfrontend/i 
    });
    
    expect(microfrontendHeading).toBeInTheDocument();
  });
});
