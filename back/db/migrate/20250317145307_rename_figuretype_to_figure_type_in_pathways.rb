class RenameFiguretypeToFigureTypeInPathways < ActiveRecord::Migration[7.2]
  def change
    rename_column :pathways, :figuretype, :figure_type
  end
end
