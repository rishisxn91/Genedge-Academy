import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'GenEdge Academy'
  const subtitle = searchParams.get('subtitle') || 'India\'s Premier AI Learning Platform'
  const author = searchParams.get('author')
  const students = searchParams.get('students')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e293b',
          backgroundImage: 'linear-gradient(to bottom right, #1e293b, #334155)',
          padding: '40px',
        }}
      >
                      <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  maxWidth: '800px',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginBottom: '20px',
                    lineHeight: '1.2',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#94a3b8',
                    marginBottom: '40px',
                  }}
                >
                  {subtitle}
                </div>
                {(author || students) && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '40px',
                      fontSize: '18px',
                      color: '#cbd5e1',
                    }}
                  >
                    {author && (
                      <div style={{ display: 'flex' }}>
                        <strong>Instructor:</strong> {author}
                      </div>
                    )}
                    {students && (
                      <div style={{ display: 'flex' }}>
                        <strong>Students:</strong> {students}
                      </div>
                    )}
                  </div>
                )}
                <div
                  style={{
                    marginTop: '40px',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#fbbf24',
                  }}
                >
                  GenEdge Academy
                </div>
              </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
