// lissajous curve parameters
let t = 0;
let phase_shift;
let init_phase = 0;
let rotations_per_sec = 1 
let frames_per_cycle = 200
let a = 2
let b = 3

let very_wide = window.innerWidth > (window.innerHeight * 2) 
let wide = window.innerWidth > window.innerHeight
let cnv_width, cnv_height


if (very_wide) {
  cnv_height = window.innerHeight
  cnv_width = cnv_height * 2
} else if (wide) {
  console.log('wide')
  cnv_height = window.innerHeight/2
  cnv_width = cnv_height * 2
} else {
  cnv_width = window.innerWidth
  cnv_height = cnv_width/2
}

let cnv
let line_width = Math.min(cnv_width, cnv_height)/15
let line_dot_count = 400

let alpha_value_spin_L
let alpha_value_spin_R
let alpha_value_roll_U
let alpha_value_roll_D
let fig_alpha = 255

    // theme colors
const theme_blue = '#2d00c8' 
const theme_blue_light = '#0084ff' 
const theme_yellow = '#ffcc00'
const theme_pink = '#ff6699' 
const theme_orange = '#fe9900' 
    
let bg_color  = 'black' 
let fig_color = bg_color=='black' ? 'white' : 'black'
fig_color = theme_yellow



function setup() {
  cnv = createCanvas(cnv_width, cnv_height);
  rectMode(CENTER)
  let newCanvasX = (windowWidth - cnv_width)/2;
  let newCanvasY =(windowHeight - cnv_height)/5;
  cnv.position(newCanvasX,newCanvasY)
  
  textAlign(CENTER)
  textSize(cnv_height/18)
  textStyle(NORMAL)
  // saveGif('p5_lissajous', frames_per_cycle, {'units':'frames'})
}

function draw() {
  background(bg_color)
  
  noStroke()
  translate(width/2, height/2)
  
  // phase = init_phase + frameCount * cycles_per_60_frames * TAU
  phase = map(frameCount%frames_per_cycle, 0, frames_per_cycle, 0, TAU)
  
  for (let i = 0; i < line_dot_count; i++) {
    let fig_width = width*0.6
    let fig_height = height*0.6
    
    let loc_on_curve = map(i, 0, line_dot_count, 0, TAU)
    
  	x = 0.5 * fig_width  * cos(a*loc_on_curve + phase);
  	y = 0.5 * fig_height * sin(b*loc_on_curve + phase);
    
    // forces 'spinning' left or right
    fig_color = color(fig_color)
    alpha_value_spin_L = map( sin((loc_on_curve*a+phase)), -1, 1, 25,250)
    alpha_value_spin_R = map( sin((loc_on_curve*a+phase)),  1,-1, 25,250)
    
    // forces 'rolling' up or down
    alpha_value_roll_U = map( cos((loc_on_curve*b+phase)), -1, 1, 25,250)
    alpha_value_roll_D = map( cos((loc_on_curve*b+phase)),  1,-1, 25,250)
    
    
    // force a rotation direction with arrowkeys
         if (keyIsDown(LEFT_ARROW))  { fig_color.setAlpha(alpha_value_spin_L) }
    else if (keyIsDown(RIGHT_ARROW)) { fig_color.setAlpha(alpha_value_spin_R) }
    else if (keyIsDown(UP_ARROW))    { fig_color.setAlpha(alpha_value_roll_U) }
    else if (keyIsDown(DOWN_ARROW))  { fig_color.setAlpha(alpha_value_roll_D) }
    else                             { fig_color.setAlpha(255)}
    
    // force a rotation direction with mouse/touch
    let px = mouseX, py = mouseY, hwr = height/width;  
    
    if (mouseIsPressed || touches.length>0 ){
      
      for (t of touches) {px=t.x; py=t.y}
      
           if (py < px*hwr && py+px*hwr < height)  { fig_color.setAlpha(alpha_value_roll_U) }
      else if (py < px*hwr && py+px*hwr > height)  { fig_color.setAlpha(alpha_value_spin_R) }
      else if (py > px*hwr && py+px*hwr < height)  { fig_color.setAlpha(alpha_value_spin_L) }
      else if (py > px*hwr && py+px*hwr > height)  { fig_color.setAlpha(alpha_value_roll_D) }
      else                                         { fig_color.setAlpha(255)}
      
    }
    

    fill(fig_color)
    noStroke()
    circle(x, y, line_width);  	
    
    
    fill(theme_yellow)
    stroke('black')
    text('In what direction does this figure spin?', 0, -height*0.4);
    text('Try to tap/click and hold different partsof this figure to "see" all directions.', 0, height*0.45);
  }

}


