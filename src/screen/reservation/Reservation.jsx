
export const Reservation = () => {
  return (
    <div>Reservation</div>
  )
}


<MultiStepFormHeader
  className={'flex w-full flex-col justify-center space-y-6'}
>
  <h2 className={'text-xl font-bold'}>Create your account</h2>
  <MultiStepFormContextProvider>
    {({ currentStepIndex }) => (
      <Stepper
        variant={'numbers'}
        steps={['Account', 'Profile', 'Review']}
        currentStep={currentStepIndex}
      />
    )}
  </MultiStepFormContextProvider>
</MultiStepFormHeader>