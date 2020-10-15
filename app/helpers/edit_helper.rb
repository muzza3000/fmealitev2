module EditHelper
  def order_and_select(elements)
    elements = elements.select { |e| e.confirmed }
    elements.each do |element|
      if element.respond_to?(:occurrence) && element.occurrence.nil?
        element.occurrence = -1;
      elsif element.respond_to?(:severity) && element.severity.nil?
        element.severity = -1;
      end
    end

    if elements[0].respond_to?(:occurrence)
      elements = elements.sort_by { |e| ((-1) * e.occurrence.to_i) }
    elsif elements[0].respond_to?(:severity)
      elements = elements.sort_by { |e| e.severity }
      elements = elements.sort_by.reverse
    end

    elements.each do |element|
      if element.respond_to?(:occurrence) && element.occurrence == -1
        element.occurrence = nil
      elsif element.respond_to?(:severity) && element.severity == -1
        element.severity = nil
      end
    end

    return elements
  end
end
