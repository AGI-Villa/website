'use client'

export default function Saturn3D() {
  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center">
      {/* 外层光晕 */}
      <div 
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 主星球容器 - 添加倾斜 */}
      <div 
        className="relative w-32 h-32"
        style={{
          transform: 'rotateZ(-15deg) rotateY(-10deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 星球主体 - 静态背景 */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(
                circle at 35% 30%,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(230, 230, 230, 0.8) 15%,
                rgba(200, 200, 200, 0.7) 30%,
                rgba(160, 160, 160, 0.65) 45%,
                rgba(120, 120, 120, 0.6) 60%,
                rgba(80, 80, 80, 0.7) 75%,
                rgba(40, 40, 40, 0.85) 90%,
                rgba(0, 0, 0, 0.95) 100%
              )
            `,
            boxShadow: `
              inset -20px -20px 40px rgba(0, 0, 0, 0.8),
              inset 15px 15px 30px rgba(255, 255, 255, 0.15),
              0 0 60px rgba(255, 255, 255, 0.2),
              0 10px 40px rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          {/* 自转的大气纹理带 */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255, 255, 255, 0.15) 10%, 
                  rgba(255, 255, 255, 0.08) 15%, 
                  transparent 20%,
                  rgba(0, 0, 0, 0.12) 35%,
                  rgba(0, 0, 0, 0.06) 40%,
                  transparent 45%,
                  rgba(255, 255, 255, 0.12) 60%,
                  rgba(255, 255, 255, 0.06) 65%,
                  transparent 70%,
                  rgba(0, 0, 0, 0.1) 85%,
                  transparent 95%
                )
              `,
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 0%',
              animation: 'rotateSurface 30s linear infinite',
              opacity: 0.8,
            }}
          />
          
          {/* 静态高光 */}
          <div 
            className="absolute rounded-full"
            style={{
              top: '20%',
              left: '25%',
              width: '35%',
              height: '35%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* 静态边缘微光 */}
          <div 
            className="absolute rounded-full"
            style={{
              top: '5%',
              right: '15%',
              width: '25%',
              height: '25%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(6px)',
            }}
          />
        </div>

        {/* 光环系统 - 跟随球体倾斜 */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '180px',
            height: '180px',
            transform: 'translate(-50%, -50%) rotateX(70deg) rotateZ(5deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 主光环 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '8px solid transparent',
              borderTopColor: 'rgba(255, 255, 255, 0.15)',
              borderBottomColor: 'rgba(255, 255, 255, 0.08)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              animation: 'ringPulse 4s ease-in-out infinite',
            }}
          />

          {/* 外环 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '4px solid transparent',
              borderTopColor: 'rgba(255, 255, 255, 0.08)',
              borderBottomColor: 'rgba(255, 255, 255, 0.04)',
              transform: 'scale(1.12)',
            }}
          />

          {/* 内环间隙 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(0, 0, 0, 0.3)',
              transform: 'scale(0.88)',
            }}
          />
        </div>

        {/* 光环在球体前方的遮罩效果 */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '180px',
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
            borderRadius: '50%',
            filter: 'blur(4px)',
            transform: 'translate(-50%, -50%) rotateZ(-2deg)',
            top: '52%',
          }}
        />
      </div>

      {/* CSS 动画定义 */}
      <style jsx>{`
        @keyframes rotateSurface {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 200% 0%;
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

