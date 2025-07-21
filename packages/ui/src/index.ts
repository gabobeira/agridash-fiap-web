// Providers
export { default as MantineProvider } from './providers/MantineProvider';
export type { MantineProviderProps } from './providers/MantineProvider';

// Theme
export { theme } from './theme';

// Base Components (Mantine wrappers)
export { default as FCard } from './components/base/FCard';
export type { FCardProps } from './components/base/FCard';

export { default as FInput } from './components/base/FInput';
export type { FInputProps } from './components/base/FInput';

export { default as FButton } from './components/base/FButton';
export type { FButtonProps } from './components/base/FButton';

export { default as FPasswordInput } from './components/base/FPasswordInput';
export type { FPasswordInputProps } from './components/base/FPasswordInput';

export { default as FTitle } from './components/base/FTitle';
export type { FTitleProps } from './components/base/FTitle';

export { default as FLink } from './components/base/FLink';
export type { FLinkProps } from './components/base/FLink';

export { default as FText } from './components/base/FText';
export type { FTextProps } from './components/base/FText';

export { default as FContainer } from './components/base/FContainer';
export type { FContainerProps } from './components/base/FContainer';

export { default as FGrid, FGridCol } from './components/base/FGrid';
export type { FGridProps, FGridColProps } from './components/base/FGrid';

export { default as FIcon } from './components/base/FIcon';
export type { FIconProps } from './components/base/FIcon';

// Domain Components (AgriDash specific)
export { default as FSensorCard } from './components/domain/FSensorCard';
export type { FSensorCardProps } from './components/domain/FSensorCard';

export { default as FWeatherWidget } from './components/domain/FWeatherWidget';
export type { FWeatherData } from './components/domain/FWeatherWidget';

export { default as FDataTable } from './components/domain/FDataTable';
export type { FDataTableProps, FDataRow } from './components/domain/FDataTable';
