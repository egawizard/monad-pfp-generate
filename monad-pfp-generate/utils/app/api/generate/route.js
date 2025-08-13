import { replicate } from '../../../utils/replicate';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { imageUrl, style } = await request.json();
    
    const stylePrompts = {
      cool: "masterpiece, best quality, cool cyberpunk style, neon colors, futuristic",
      funny: "cartoon style, cute, funny expression, bright colors, anime style",
      artistic: "oil painting style, masterpiece, artistic, detailed",
      retro: "retro 80s style, synthwave, vaporwave aesthetic"
    };

    const prompt = `${stylePrompts[style] || stylePrompts.cool}, portrait, high quality, detailed`;

    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          image: imageUrl,
          prompt: prompt,
          num_inference_steps: 50,
          guidance_scale: 7.5,
          strength: 0.75
        }
      }
    );

    return NextResponse.json({ success: true, imageUrl: output[0] });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}