import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';

function ListDrawer({ items }) {
  return (
    <List>
      {
        items.map(item => (
          <Link
            key={item.texto}
            href={item.url}>
            <ListItem
              button>
              <ListItemIcon>{ item.icon }</ListItemIcon>
              <ListItemText
                primary={item.texto}>
              </ListItemText>
            </ListItem>
          </Link>
        ))
      }
    </List>
  )
}

export { ListDrawer };