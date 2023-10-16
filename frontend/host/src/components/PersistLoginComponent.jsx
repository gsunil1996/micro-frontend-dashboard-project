import PersistLogin from 'auth/PersistLoginComp';

const PersistLoginComponent = () => {
  const { isLoading, isError, error, isSuccess, isUninitialized, trueSuccess } = PersistLogin;
  console.log("isLoading", isLoading)
  return (
    <div>PersistLoginComponent</div>
  )
}

export default PersistLoginComponent