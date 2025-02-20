import {NextRequest, NextResponse} from 'next/server';

export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        console.log(body);
        return NextResponse.json({success: true});
    }catch(e){
        return NextResponse.json({success: false, error: e});
    }
}