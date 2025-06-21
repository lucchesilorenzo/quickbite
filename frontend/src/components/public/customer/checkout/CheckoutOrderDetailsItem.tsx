import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type IconComponent = OverridableComponent<
  SvgIconTypeMap<SvgIconProps, "svg">
> & {
  muiName: string;
};

type CheckoutOrderDetailsItemProps = {
  item: {
    startIcon: IconComponent;
    title: string;
    subtitle: string;
    endIcon: IconComponent;
  };
};

export default function CheckoutOrderDetailsItem({
  item,
}: CheckoutOrderDetailsItemProps) {
  return (
    <ListItem disablePadding disableGutters>
      <ListItemButton sx={{ px: 3 }} onClick={() => {}}>
        <ListItemIcon>
          <item.startIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          secondary={item.subtitle}
        ></ListItemText>
        <ListItemIcon sx={{ justifyContent: "flex-end" }}>
          <item.endIcon color="inherit" />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
