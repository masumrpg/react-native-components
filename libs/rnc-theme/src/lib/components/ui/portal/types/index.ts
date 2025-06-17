export interface PortalProps {
  children: React.ReactNode;
  name?: string;
}

export interface PortalHostProps {
  name?: string;
}

export interface PortalContextType {
  mount: (name: string, children: React.ReactNode) => void;
  unmount: (name: string) => void;
  update: (name: string, children: React.ReactNode) => void;
}

export interface PortalState {
  [key: string]: React.ReactNode;
}