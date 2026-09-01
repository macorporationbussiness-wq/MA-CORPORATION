import React from 'react';
import School from '@mui/icons-material/School';
import BusinessCenter from '@mui/icons-material/BusinessCenter';
import Groups from '@mui/icons-material/Groups';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import Handshake from '@mui/icons-material/Handshake';
import Star from '@mui/icons-material/Star';
import Lightbulb from '@mui/icons-material/Lightbulb';
import GpsFixed from '@mui/icons-material/GpsFixed';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Code from '@mui/icons-material/Code';
import DesignServices from '@mui/icons-material/DesignServices';
import Campaign from '@mui/icons-material/Campaign';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Psychology from '@mui/icons-material/Psychology';
import Cloud from '@mui/icons-material/Cloud';
import PhoneIphone from '@mui/icons-material/PhoneIphone';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import Brush from '@mui/icons-material/Brush';
import DataObject from '@mui/icons-material/DataObject';
import AccountTree from '@mui/icons-material/AccountTree';

const iconMap = {
    graduation: School,
    briefcase: BusinessCenter,
    team: Groups,
    rocket: RocketLaunch,
    handshake: Handshake,
    star: Star,
    lightbulb: Lightbulb,
    target: GpsFixed,
    growth: TrendingUp,
    code: Code,
    design: DesignServices,
    marketing: Campaign,
    trophy: EmojiEvents,
    psychology: Psychology,
    cloud: Cloud,
    mobile: PhoneIphone,
    settings: SettingsApplications,
    brush: Brush,
    data: DataObject,
    network: AccountTree,
};

const gradientPalette = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #14B8A6 0%, #0EA5A4 100%)',
    'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #fc6076 0%, #ff9a44 100%)',
];

const getGradient = (name) => {
    if (!name) return gradientPalette[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradientPalette.length;
    return gradientPalette[index];
};

export default function Icon3D({
    name,
    size = 64,
    animate = true,
    style = {},
}) {
    const IconComponent = iconMap[name] || Star;
    const gradient = getGradient(name);

    return (
        <div
            className="icon3d-wrapper"
            style={{
                perspective: '800px',
                width: size,
                height: size,
                margin: '0 auto',
                ...style,
            }}
        >
            <div
                className={`icon3d-card ${animate ? 'icon3d-animate' : ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20%',
                    background: gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow:
                        '0 10px 25px rgba(0,0,0,0.25), inset 0 -8px 12px rgba(0,0,0,0.18), inset 0 4px 8px rgba(255,255,255,0.25)',
                    transform: 'rotateY(-20deg) rotateX(15deg)',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <IconComponent
                    style={{
                        fontSize: size * 0.55,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                        transform: 'translateZ(20px)',
                    }}
                />
            </div>
        </div>
    );
}

export { iconMap, gradientPalette };
