
export interface MenuItem {
    index: string;
    title: string;
    value?: string;
    link?: string;
    disabled?: boolean;
    popperOffset?: number;
    subMenu?: MenuItem[];
  }
  