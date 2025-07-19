import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { 
      name: /AgriDash FIAP/i,
      level: 1 
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('should render dashboard card', () => {
    render(<Home />);
    
    const dashboardCard = screen.getByRole('heading', { 
      name: /Dashboard/i,
      level: 3 
    });
    
    expect(dashboardCard).toBeInTheDocument();
  });

  it('should render dashboard access link', () => {
    render(<Home />);
    
    const dashboardLink = screen.getByRole('link', { 
      name: /Acessar Dashboard/i 
    });
    
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });

  it('should render architecture information', () => {
    render(<Home />);
    
    const architectureHeading = screen.getByRole('heading', { 
      name: /Arquitetura Microfrontends/i,
      level: 2 
    });
    
    expect(architectureHeading).toBeInTheDocument();
  });
});
