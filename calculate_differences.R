library(tidyverse)


data <- read_csv("human.csv")


view(data)


# Remove unneeded columns
sub_data <- data %>%
  dplyr::select(!c(filename,uniquePopulationName, parentPopulation, channel, Species, statistic)) 

# Group data and subtract from basal
diff_data <- sub_data %>%
  group_by(population, reagent, Donor, Gender) %>%
  mutate(value_diff = value - value[Condition == "Basal"]) 
  



# Preliminary data to generate one plot
# Filter out outliers
filtered_data <- diff_data %>%
  group_by(population, Condition, reagent, Gender) %>%  # Group by relevant categories
  mutate(
    min = min(value_diff, na.rm = TRUE),
    max = max(value_diff, na.rm = TRUE),
    mean_value = mean(value_diff, na.rm = TRUE),
    sd_value = sd(value_diff, na.rm = TRUE),
  ) %>%
  filter(abs(value_diff - mean_value) <= 3 * sd_value) %>% # Remove outliers
  mutate(variance = var(value_diff, na.rm = TRUE))



filtered_data %>%
  ungroup() %>% group_by(population, reagent, Condition) %>%
  summarise(median_diff = median(value_diff),
            median_var = median(variance)) %>% ungroup() %>%
#  filter(Condition == 'LPS') %>%
  ggplot(aes(x = median_diff, y = median_var)) +
  geom_point(aes(color = population)) +
  theme_classic() +
  scale_color_manual(values = as.vector(alphabet(n = 16))) +
  facet_wrap(~Condition, scales ="free") +
  stat_cor(method = "spearman") +
  geom_smooth(method = "lm")
  scale_y_log10() +
  scale_x_log10()

  
  
# Function to generate stage 1 figure
  
# Load packages
library(tidyverse)
  
# Load data  
data_obj <- read.csv("filtered_data.csv")

# Plot  
plot_median_variance <- function(population = "CD4+T cells", condition = "TNFa", data_obj){
    
    p <- data_obj %>%
      group_by(population, reagent, Condition) %>%
      summarise(median_diff = median(value_diff),
                median_var = median(variance)) %>% ungroup() %>%
      filter(population == population & condition == Condition) %>%
      ggplot(aes(x = median_diff, y = median_var)) +
      geom_point(aes(color = population)) +
      theme_classic() +
      stat_cor(method = "spearman")
    
    return(p)
    
}
  


filtered_data %>% 
  filter(population == "Neutrophils" & Condition == "TNFa") %>%
  ggplot(aes(x = reorder(reagent, -value_diff), y = value_diff, fill = Gender)) +
  geom_hline(yintercept = 0, color = "red") +
  geom_boxplot(outlier.shape = NA) +
  geom_jitter(size = .4, position = position_jitterdodge(jitter.width = .2)) +
  stat_compare_means(method = "wilcox", label = "..p..")
  
  
  
  
  # Generate volcano plot of variance (Y) by median difference from basal
  filtered_data %>%
    head()
  
  
  
  
