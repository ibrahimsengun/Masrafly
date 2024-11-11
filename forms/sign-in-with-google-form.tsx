import { signInWithGoogleAction } from '@/actions/auth-actions';
import { SubmitButton } from '@/components/submit-button';

const SignInWithGoogleForm = () => {
  return (
    <form>
      <SubmitButton formAction={signInWithGoogleAction}>Google Login</SubmitButton>
    </form>
  );
};

export default SignInWithGoogleForm;
