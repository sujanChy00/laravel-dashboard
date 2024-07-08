import { Textarea } from "@/components/ui/textarea";
import {
    TextareaHTMLAttributes,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

export default forwardRef(function TextareaInput(
    {
        isFocused = false,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return <Textarea {...props} ref={localRef} />;
});
