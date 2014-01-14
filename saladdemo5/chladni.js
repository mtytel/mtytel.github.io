/**
 * Salad: javascript waves, resonance and Chladni figures.
 *
 * Copyright (c) 2013
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

var chladni = function() {
  // Speed constant somehow defines speed of waves. Not sure on relationship.
  var SPEED_CONSTANT = 1.0;
  // Damping consistently puts friction on all waving points.
  var damping_ = 0.999;
  // Amplitude on the sine wave input equation
  var amplitude_ = 5.0;
  // Influences frequency on sine wave input equation
  var coloring_ = true;
  var r = Math.sqrt(3 / 2) * 249;
  var m = 2;
  var n = 3;
  var frequency_ = 3 * Math.PI * Math.sqrt(4 * (m * m + m * n + n * n) / 27) / r;

  // Store the width and height so we don't have to access the DOM later.
  var canvas_width_ = 0, canvas_height_ = 0;
  var context_ = null;
  var image_ = null;
  var pos_matrix_ = null;
  var vel_matrix_ = null;
  var temp_matrix_ = null;
  var time_ = 0;

  function setDamping(damping) {
    damping_ = damping;
  }
  function setAmplitude(amplitude) {
    amplitude_ = amplitude;
  }
  function setFrequency(frequency) {
    frequency_ = frequency;
  }

  // Index by row first, then column.
  function createTwoDimArray(width, height) {
    var arr = [];
    for (var r = 0; r < height; r++) {
      var row = [];
      for (var c = 0; c < width; c++) {
        row.push(0);
      }
      arr.push(row);
    }
    return arr;
  }

  function tick() {
    // Update the input equation.
    var ngon = 3;
    var points = [];
    var center_x = canvas_width_ / 2;
    var center_y = canvas_height_ / 2;
    var radius = Math.min(center_x, center_y) - 1;
    for (var i = 0; i <= ngon; i++) {
      var x = Math.round(center_x - radius * Math.sin(2 * Math.PI * i / ngon));
      var y = Math.round(center_y - radius * Math.cos(2 * Math.PI * i / ngon));
      points.push([x, y]);
    }
    for (var p = 0; p < ngon; p++) {
      var num_zeros = Math.max(Math.abs(points[p][0] - points[p + 1][0]),
                               Math.abs(points[p][1] - points[p + 1][1]));
      for (var i = 0; i <= num_zeros; i++) {
        var t = i / num_zeros;
        var r = Math.round((1 - t) * points[p][1] + t * points[p + 1][1]);
        var c = Math.round((1 - t) * points[p][0] + t * points[p + 1][0]);
        pos_matrix_[r][c] = 0.0;
        vel_matrix_[r][c] = 0.0;
      }
    }

    var val = amplitude_ * Math.sin(time_ * frequency_);
    /*
    for (var i = 0; i < canvas_width_; i++) {
      for (var p = 0; p < ngon; p++) {
        var y = Math.round(0.9 * points[p][0] + 0.1 * center_y);
        var x = Math.round(0.9 * points[p][1] + 0.1 * center_x);
        pos_matrix_[x][y] = val;
      }
    }
    */
    time_++;

    // Wave equation! Give an acceleration based on neighboring points.
    for (var r = 1; r < canvas_height_ - 1; r++) {
      for (var c = 1; c < canvas_width_ - 1; c++) {
        var neighbor_sum = pos_matrix_[r - 1][c] + pos_matrix_[r + 1][c] +
                           pos_matrix_[r][c - 1] + pos_matrix_[r][c + 1];
        var difference = pos_matrix_[r][c] - neighbor_sum / 4.0;
        temp_matrix_[r][c] = vel_matrix_[r][c] - SPEED_CONSTANT * difference + val / 100.0;
      }
    }

    // Swap the velocity matrices.
    var temp = vel_matrix_;
    vel_matrix_ = temp_matrix_;
    temp_matrix_ = vel_matrix_;

    for (var r = 1; r < canvas_height_ - 1; r++) {
      for (var c = 1; c < canvas_width_ - 1; c++) {
        // Damp the velocity for each point.
        vel_matrix_[r][c] *= damping_;

        // Update the position for each point.
        pos_matrix_[r][c] += vel_matrix_[r][c];

        // Update the image_ so it's ready to draw if we need.
        var vel_change = vel_matrix_[r][c] / frequency_;
        var bright = 0;
        if (coloring_)
          bright = 255 - 1 * (pos_matrix_[r][c] * pos_matrix_[r][c] + vel_change * vel_change);
        else
          bright = Math.floor(pos_matrix_[r][c] * 20);
        var index = 4 * (r * canvas_width_ + c);
        image_.data[index] = bright;
        image_.data[index + 1] = bright;
        image_.data[index + 2] = bright;
        image_.data[index + 3] = 255;
      }
    }
  }

  function draw() {
    context_.putImageData(image_, 0, 0);
    window.requestAnimationFrame(draw);
  }

  function init_canvas() {
    var canvas = document.getElementById('chladni');
    context_ = canvas.getContext('2d');
    canvas_width_ = canvas.width;
    canvas_height_ = canvas.height;

    // reset the canvas
    image_ = context_.createImageData(canvas_width_, canvas_height_);
    pos_matrix_ = createTwoDimArray(canvas_width_, canvas_height_);
    vel_matrix_ = createTwoDimArray(canvas_width_, canvas_height_);
    temp_matrix_ = createTwoDimArray(canvas_width_, canvas_height_);
    time_ = 0;

    setInterval(tick, 20);
    draw();
  }

  function init_page() {
     $('#reset').on('click', function() {
       init_canvas();
     });
     $('#coloring').on('click', function() {
       coloring_ = !coloring_;
     });
     function get_check_set_redraw(f) {
       return function() {
         var x = parseFloat($(this).val());
         if (!isNaN(x)) {
           f(x);
         }
       };
     }
     init_canvas();
  }

  return {
    init_canvas: init_canvas,
    init_page: init_page,
    draw: draw,
    tick: tick,
  };
}();

window.onload = chladni.init_page;
