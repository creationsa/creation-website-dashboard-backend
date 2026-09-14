export interface ClientLogo {
  image: string;
  alt: string;
}

export interface ClientsData {
  title: string;
  logos: ClientLogo[];
}

export interface ClientsProps {
  data: ClientsData | null;
}

export interface ClientsSliderProps {
  logos: ClientLogo[];
}

export interface ClientLogoItemProps {
  logo: ClientLogo;
}
