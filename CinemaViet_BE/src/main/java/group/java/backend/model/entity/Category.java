package group.java.backend.model.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "category")
@Data
@NoArgsConstructor
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "parent_id")
	private String parentID;
	
	@Column(name = "cate_name")
	private String CateName;
	
	@Column(name = "status")
	private int status;
	
	@ManyToOne
	@JoinColumn(name = "create_by_id")
	private User CreateBy;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_category_id")
	private Set<MovieCategory> categories = new HashSet<>();

}
