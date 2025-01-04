interface IconProps {
    svgSource?: string;
    size?: string;
    color?: string | null;
    className?: string;
}

function SvgIcon({ svgSource, color, size = '2em', className }: IconProps) {
    if (!svgSource) {
        return null;
    }

    return (
        <span
            style={{ color: color ?? 'hsl(var(--foreground))', width: size, height: size }}
            className={className}
            dangerouslySetInnerHTML={{ __html: svgSource }}
        />
    );
}

export default SvgIcon;
