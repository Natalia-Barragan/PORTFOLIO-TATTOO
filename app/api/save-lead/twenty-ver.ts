// import { NextRequest, NextResponse } from "next/server"

// interface LeadData {
//   name: string
//   phone: string
//   email: string
//   tattooType: string
//   size: string
//   bodyArea: string
//   message: string
//   status: string
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body: LeadData = await request.json()

//     // Validate required fields
//     if (!body.name || !body.phone || !body.email || !body.tattooType || !body.size || !body.bodyArea || !body.message) {
//       return NextResponse.json(
//         { error: "Faltan campos requeridos" },
//         { status: 400 }
//       )
//     }

//     // TODO: Integrate with Budibase CRM
//     // This is where you would:
//     // 1. Save the lead to Budibase using their API
//     // 2. Send email notification using Resend
//     // 3. Handle any errors from these services

//     console.log("Lead received:", body)

//     // Placeholder response - replace with actual Budibase/Resend integration
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Lead guardado correctamente",
//         data: body,
//       },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error("Error processing lead:", error)
//     return NextResponse.json(
//       { error: "Error al procesar la solicitud" },
//       { status: 500 }
//     )
//   }
// }
