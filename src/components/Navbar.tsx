
import { Link, useNavigate } from "react-router-dom";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Plus, Search } from "lucide-react";
import MenuConfig from "./menuconfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { data: config, isLoading, isError } = useSiteConfig();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <nav className="w-full fixed top-0 z-50 h-16 animate-pulse bg-gray-200" />
    );
  }

  if (isError || !config) {
    return (
      <nav className="w-full fixed top-0 z-50 h-16 bg-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-white">Error loading navbar</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className="w-full fixed top-0 z-50 shadow-md"
      style={{ 
        background: `linear-gradient(to right, ${config.navbar_color}, ${config.primary_color})`,
        borderColor: `${config.primary_color}20`
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transform transition duration-300 hover:scale-105"
          >
            {config.navbar_logo_type === 'image' && config.navbar_logo_image ? (
              <img 
                src={config.navbar_logo_image} 
                alt="Logo" 
                className="h-12 w-12 rounded-full object-cover border-2 transition-transform duration-300 hover:scale-110"
                style={{ 
                  borderColor: config.text_color,
                }}
              />
            ) : (
              <span 
                className="text-3xl font-bold tracking-tighter"
                style={{ color: config.navbar_title_color || config.text_color }}
              >
                {config.navbar_logo_text || 'Vale Notícias'}
              </span>
            )}
          </Link>

          <div className="flex items-center space-x-2">
            {/* Add button with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center p-2.5 rounded-full transition-all duration-300 hover:scale-105"
                  style={{ 
                    color: config.text_color,
                    background: 'rgba(107, 114, 128, 0.3)'
                  }}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/posts/new')}>
                  <img src="/posts.png" alt="Posts" className="w-4 h-4 mr-2" />
                  Criar Post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/products/new')}>
                  <img src="/produtos.png" alt="Produtos" className="w-4 h-4 mr-2" />
                  Criar Produto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search button */}
            <button
              onClick={() => navigate('/search')}
              className="flex items-center justify-center p-2.5 rounded-full transition-all duration-300 hover:scale-105"
              style={{ 
                color: config.text_color,
                background: 'rgba(107, 114, 128, 0.3)'
              }}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Menu button */}
            <MenuConfig />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
