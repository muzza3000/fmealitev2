module FmeaHelper
  def fmea_type_icon(fmea)
    #'Design', 'System' or 'Process'
    if fmea.fmea_type == "Process"
      ('<i class="fas fa-tasks"></i>').html_safe
    elsif fmea.fmea_type == "System"
      ('<i class="fas fa-project-diagram"></i>').html_safe
    else
      ('<i class="fas fa-drafting-compass"></i>').html_safe
    end
  end

  def product_images?(fmea)
    fmea.images.length == 0 ? false : true
  end

  def find_first_failure_mode(fmea)
    fmea.functions.each do |function|
      if function.failure_modes.present?
        return function.failure_modes[0]
      end
    end
  end
end