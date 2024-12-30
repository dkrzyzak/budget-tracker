interface IconProps {
    svgSource: string;
    size?: string;
    color?: string;
    className?: string;
}

function Icon({ svgSource, color, size = '2em', className }: IconProps) {
    return (
        <div
            style={{ color: color, width: size, height: size }}
            className={className}
            dangerouslySetInnerHTML={{ __html: svgSource }}
        />
    );
}

export default Icon;
