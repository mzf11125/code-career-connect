
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPublishedCourses, getMentorCourses, createCourse, type EnhancedCourse } from "@/services/enhancedCourseService";

export const usePublishedCourses = () => {
  return useQuery({
    queryKey: ['published-courses'],
    queryFn: () => getPublishedCourses(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useMentorCourses = () => {
  return useQuery({
    queryKey: ['mentor-courses'],
    queryFn: () => getMentorCourses(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (courseData: Partial<EnhancedCourse>) => createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-courses'] });
      queryClient.invalidateQueries({ queryKey: ['published-courses'] });
    },
  });
};
