class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.text :description
      t.string :uid, null: false
      t.string :link, null: false
      t.belongs_to :user, null: false, index: true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
