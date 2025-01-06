import { PopoverContent } from '@radix-ui/react-popover';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger } from '../ui/popover';

interface ColorPickerProps {
    targetLabel?: string;
    color?: string;
    onChange?: (newColor: string) => void;
}

function ColorPicker({ targetLabel, color, onChange }: ColorPickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' type='button' className='flex-1' style={{ backgroundColor: color ? color : "" }}>
                    <span className='bg-background/50 p-1 rounded-md'>
                    {targetLabel}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <HexColorPicker color={color} onChange={onChange} onClick={(e) => e.stopPropagation()}  />
            </PopoverContent>
        </Popover>
    );
}

export default ColorPicker;
