import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'radial-gradient(circle at center, #111111 0%, #000000 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(192, 192, 192, 0.05)',
                        border: '2px solid rgba(192, 192, 192, 0.2)',
                        borderRadius: '50%',
                        width: '240px',
                        height: '240px',
                        marginBottom: '60px',
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d1d5db"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '120px', height: '120px' }}
                    >
                        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                    </svg>
                </div>
                <div
                    style={{
                        fontSize: 100,
                        fontFamily: 'sans-serif',
                        color: 'white',
                        fontWeight: 'normal',
                        letterSpacing: '0.15em',
                        display: 'flex',
                    }}
                >
                    INK<span style={{ color: '#d1d5db', marginLeft: '30px' }}>STUDIO</span>
                </div>
                <div
                    style={{
                        fontSize: 40,
                        fontFamily: 'sans-serif',
                        color: '#a1a1a1',
                        marginTop: '30px',
                        letterSpacing: '0.05em',
                    }}
                >
                    Premium Tattoo Experience
                </div>
            </div>
        ),
        { ...size }
    )
}
