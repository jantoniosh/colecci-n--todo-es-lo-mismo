#ifdef GL_ES
precision mediump float;
#endif

uniform float factor;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D u_tex0;

#define TAU 6.283185307179586
#define PI 3.141592653589793

float maskIt(in float mask,in float v0,in float v1)
{
  return mask*v0+(1.-mask)*v1;
}

float circle(vec2 position,float radius){
  return step(radius,length(position-vec2(.5)));
}

void main(){
  float phase=u_time*.5;
  
  // Waves
  vec2 st=gl_FragCoord.xy/u_resolution.xy*.5;
  st.y=1.-st.y;
  vec4 letras=texture2D(u_tex0,st);
  // float m=sin(phase*TAU)*.5+1.;
  
  // float m=7.+2.*sin(phase*TAU);
  float m=7.+2.*factor;
  
  float x=fract(cos((2.*(st.x)+phase)*TAU)*3.+m*st.y);
  // float y=fract(sin((1.*st.y+0.*phase)*TAU)*1.);
  x=step(.5,x);
  vec4 fondo=vec4(vec3(x),1.);
  vec4 frente=vec4(vec3(1.-x),1.);
  
  float cir=circle(st,.2);
  
  // Output
  vec4 color=mix(frente,fondo,letras.a);
  gl_FragColor=color;
}