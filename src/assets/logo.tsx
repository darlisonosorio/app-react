import React from "react";

const UserFinanceLogo: React.FC<{ width?: number; height?: number }> = ({
  width = 200,
  height = 50,
}) => (
  <svg
    data-testid="user-finance-logo"
    width={width}
    height={height}
    viewBox="0 0 200 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Fundo transparente */}
    <rect width="200" height="50" fill="none" />

    {/* Texto principal */}
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Poppins, sans-serif"
      fontWeight="700"
      fontSize="24"
      fill="#4F46E5" /* cor principal, azul violeta */
    >
      UserFinance
    </text>

    {/* Opcional: sublinha decorativa */}
    <line
      x1="20"
      y1="42"
      x2="180"
      y2="42"
      stroke="#A78BFA" /* cor secundária */
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default UserFinanceLogo;