import { NextResponse } from 'next/server';

// Este é um exemplo de API Route para futuras integrações
// Por enquanto, retorna um placeholder

export async function GET() {
  // Aqui você conectaria ao banco de dados
  // Exemplo: const activities = await db.activities.findMany()
  
  return NextResponse.json({
    message: 'API pronta para integração com banco de dados',
    activities: [],
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Aqui você salvaria no banco de dados
  // Exemplo: const activity = await db.activities.create({ data: body })
  
  return NextResponse.json({
    message: 'Activity created (placeholder)',
    activity: body,
  });
}

