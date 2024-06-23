import LogInForm from "./LogInForm";
import OverLay from "./OverLay";


export default function Auth() {
  return (
    <OverLay className="p-3">
      <LogInForm />
    </OverLay>
  );
}
