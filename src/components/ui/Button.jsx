import { useState } from "react";

/**
 * Componente Button reutilizable con animaciones y variantes
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {boolean} props.fullWidth - Si el botón ocupa todo el ancho
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {React.ReactNode} props.icon - Ícono opcional
 * @param {string} props.className - Clases adicionales
 * @param {Function} props.onClick - Función al hacer click
 */
const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  children,
  icon,
  className = "",
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Variantes de color
  const variants = {
    primary:
      "bg-crumble-primary text-white hover:bg-crumble-secondary active:bg-crumble-dark shadow-md hover:shadow-lg",
    secondary:
      "bg-crumble-rose text-white hover:bg-crumble-pink active:bg-crumble-accent shadow-md hover:shadow-lg",
    outline:
      "border-2 border-crumble-primary text-crumble-primary hover:bg-crumble-primary hover:text-white active:bg-crumble-secondary",
    ghost:
      "text-crumble-primary hover:bg-crumble-cream active:bg-crumble-peach",
  };

  // Tamaños
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const baseClasses = `
    relative overflow-hidden
    font-medium rounded-lg
    transition-all duration-300 ease-out
    transform
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const handleClick = (e) => {
    if (disabled) return;

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);

    if (onClick) onClick(e);
  };

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {/* Efecto ripple */}
      {isPressed && (
        <span className="absolute inset-0 animate-ping bg-white opacity-25 rounded-lg" />
      )}

      {/* Contenido */}
      <span className="relative flex items-center justify-center gap-2">
        {icon && (
          <span className="transition-transform group-hover:scale-110">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
};

export default Button;
