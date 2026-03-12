import TextField from "@mui/material/TextField";

interface InputTextProps {
    value: string;
    setValue: (value: string) => void;
    label?: string;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    size?: "small" | "medium";
    required?: boolean;
}

export default function InputText({ value, setValue, label = '', placeholder, multiline, rows, size, required = true }: InputTextProps) {
    return (
        <TextField
            label={label}
            variant="outlined"
            fullWidth
            required={required}
            value={value}
            rows={rows}
            multiline={multiline}
            size={size}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
        />
    );
}
