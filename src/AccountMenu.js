import { Account } from '@toolpad/core/Account';
import Avatar from '@mui/material/Avatar';


function AccountMenu() {

  return (
    <Account
      slotProps={{
        signInButton: {
          color: 'info',
          variant: 'outlined',
        },
        preview: {
          variant: 'condensed',
          slotProps: {
            avatarIconButton: {
              sx: {
                width: 'fit-content',
                margin: 'auto',
              },
            },
            avatar: {
              variant: 'circular',
            },
          },
        },
      }}
    />
  );
}

export default AccountMenu;
