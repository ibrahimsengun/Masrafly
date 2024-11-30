import { signOutAction } from '@/actions/auth-actions';
import { User } from '@supabase/supabase-js';
import { LogOut, UserIcon } from 'lucide-react';
import Link from 'next/link';
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
  const showedName = user?.user_metadata?.full_name ?? user.email;
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
        <DropdownMenuLabel>{showedName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/preferences" className="flex flex-row gap-2 items-center cursor-pointer">
              <UserIcon className="w-4" />
              <span>Preferences</span>
            </Link>
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
