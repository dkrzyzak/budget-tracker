import { type PropsWithChildren } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './ui/drawer';
import { useMediaQuery } from '~/hooks/use-media-query';

export type ResponsiveModalClassnames = {
    contentMobile?: string;
    contentDesktop?: string;
    titleMobile?: string;
    titleDesktop?: string;
    descriptionMobile?: string;
    descriptionDesktop?: string;
};

type ResponsiveModalProps = PropsWithChildren<{
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    trigger?: React.ReactNode;
    title?: string;
    description?: string;
    classNames?: ResponsiveModalClassnames;
}>;

export function ResponsiveModal({
    isOpen,
    setOpen,
    trigger,
    children,
    title,
    description,
    classNames,
}: ResponsiveModalProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setOpen}>
                {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
                <DialogContent className={classNames?.contentDesktop}>
                    <DialogHeader>
                        {title ? (
                            <DialogTitle className={classNames?.titleDesktop}>
                                {title}
                            </DialogTitle>
                        ) : (
                            <DialogTitle className='sr-only' />
                        )}

                        {description ? (
                            <DialogDescription className={classNames?.descriptionDesktop}>
                                {description}
                            </DialogDescription>
                        ) : (
                            <DialogDescription className='sr-only' />
                        )}
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
            <DrawerContent className={classNames?.contentMobile}>
                <DrawerHeader>
                    {title ? (
                        <DrawerTitle className={classNames?.titleMobile}>
                            {title}
                        </DrawerTitle>
                    ) : (
                        <DrawerTitle className='sr-only' />
                    )}

                    {description ? (
                        <DrawerDescription className={classNames?.descriptionMobile}>
                            {description}
                        </DrawerDescription>
                    ) : (
                        <DrawerDescription className='sr-only' />
                    )}
                </DrawerHeader>

                {children}
            </DrawerContent>
        </Drawer>
    );
}
