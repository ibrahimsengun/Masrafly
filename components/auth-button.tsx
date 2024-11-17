import { signOutAction } from '@/actions/auth-actions';
import { User } from '@supabase/supabase-js';
import { LogOut, Settings, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

export default function AuthButton({ user }: { user: User }) {
  const avatarUrl = user?.user_metadata?.avatar_url;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatarUrl} alt="user_avatar" />
          <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-row gap-2 items-center">
            <UserIcon className="w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-row gap-2 items-center">
            <Settings className="w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <form>
              <button className="flex flex-row gap-2 items-center" formAction={signOutAction}>
                <LogOut className="w-4" />
                <span>Log Out</span>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
