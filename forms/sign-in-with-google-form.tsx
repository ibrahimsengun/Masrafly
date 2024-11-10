import { signInWithGoogleAction } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';

const SignInWithGoogleForm = () => {
  return (
    <form>
      <SubmitButton formAction={signInWithGoogleAction}>Google Login</SubmitButton>
    </form>
  );
};

export default SignInWithGoogleForm;
