
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";

interface FormStepperProps {
    steps: string[];
    activeStep: number;
    children: React.ReactNode;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    handleSubmit: () => Promise<void>;
}

export default function FormStepper({ steps, activeStep, setActiveStep, children, handleSubmit }: FormStepperProps) {

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (activeStep === steps.length - 1) {
            handleSubmit();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel sx={{ display: { xs: 'none', sm: 'flex' } }}>{label}</StepLabel>
                            <StepLabel sx={{ display: { xs: 'flex', sm: 'none' } }} />
                        </Step>
                    );
                })}
            </Stepper>
            {children}
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </>
        </>
    );
}